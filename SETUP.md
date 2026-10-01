# PhishGuard Supabase Setup Guide

Welcome to the backend setup guide for PhishGuard! This guide will help you connect your Next.js application to a real Supabase database so users can log in with Google and save their progress.

## Step 1: Create a Supabase Project
1. Go to [Supabase](https://supabase.com/) and sign in or create an account.
2. Click **New Project**.
3. Name it `phishguard`, choose a secure database password (save it somewhere safe), and select your closest region.
4. Wait for the project to finish provisioning (takes a minute or two).

## Step 2: Configure Environment Variables
We need to connect your local Next.js app to your new Supabase project.
1. In your Supabase project dashboard, go to **Project Settings** (the gear icon on the left).
2. Go to **API** under Configuration.
3. You will see a **Project URL** and a **Project API Keys (anon public)**.
4. In your PhishGuard project folder, you should have a file named `.env.local` (or create it if it doesn't exist).
5. Add these lines to `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=YOUR_PROJECT_URL_HERE
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY_HERE
NEXT_PUBLIC_APP_URL=http://localhost:3000
```
*(Note: These keys are safe to be public. Never expose your `service_role` key).*

## Step 3: Run the Database Setup SQL
This is the magic part where we create all tables, schemas, and Row Level Security (RLS) policies.

1. In Supabase, go to the **SQL Editor** (the `</>` icon on the left sidebar).
2. Click **New query**.
3. Copy and paste the entire SQL block below into the editor, then click **Run**.

```sql
-- 1. Profiles Table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Learning Progress Table
CREATE TABLE learning_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  topic_id TEXT NOT NULL,
  status TEXT DEFAULT 'not_started' CHECK (status IN ('not_started','learning','flashcards_done','quiz_attempted','completed','mastered')),
  quiz_score INTEGER,
  completed_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, topic_id)
);

-- 3. Flashcard Progress Table
CREATE TABLE flashcard_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  topic_id TEXT NOT NULL,
  flashcard_id TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new','learning','known','review')),
  review_count INTEGER DEFAULT 0,
  last_reviewed_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, topic_id, flashcard_id)
);

-- 4. Quiz Attempts Table
CREATE TABLE quiz_attempts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  topic_id TEXT NOT NULL,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  percentage NUMERIC NOT NULL,
  completed_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Quiz Answers Table
CREATE TABLE quiz_answers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  attempt_id UUID REFERENCES quiz_attempts NOT NULL,
  question_id TEXT NOT NULL,
  selected_answer TEXT NOT NULL,
  correct BOOLEAN NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Mistake Reviews Table
CREATE TABLE mistake_reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  topic_id TEXT NOT NULL,
  question_id TEXT NOT NULL,
  reviewed BOOLEAN DEFAULT FALSE,
  reviewed_at TIMESTAMPTZ,
  UNIQUE(user_id, topic_id, question_id)
);


-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================
-- This ensures users can only see and edit their OWN data.

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE flashcard_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE mistake_reviews ENABLE ROW LEVEL SECURITY;

-- Profile Policies
CREATE POLICY "Users can read own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Progress Policies
CREATE POLICY "Users access own progress" ON learning_progress FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users access own flashcards" ON flashcard_progress FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users access own attempts" ON quiz_attempts FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users access own mistake reviews" ON mistake_reviews FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users access own answers" ON quiz_answers FOR ALL USING (
  EXISTS (
    SELECT 1 FROM quiz_attempts qa 
    WHERE qa.id = quiz_answers.attempt_id 
    AND qa.user_id = auth.uid()
  )
);

-- ==========================================
-- AUTOMATIC PROFILE CREATION TRIGGER
-- ==========================================
-- When a user logs in with Google, this automatically creates their profile record.

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
```

## Step 4: Configure Google OAuth Login
To let users sign in with their Google accounts:
1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project (e.g. `phishguard-auth`).
3. Go to **APIs & Services** -> **OAuth consent screen** and set it up (External is fine for testing).
4. Go to **Credentials** -> **Create Credentials** -> **OAuth client ID**.
5. Select **Web application**.
6. **Authorized redirect URIs**: Copy your Supabase callback URL. You can find this in your Supabase dashboard: **Authentication** -> **Providers** -> **Google**. (It looks like `https://YOUR_PROJECT.supabase.co/auth/v1/callback`).
7. Save and copy the **Client ID** and **Client Secret**.
8. Go back to your **Supabase Dashboard** -> **Authentication** -> **Providers** -> **Google**.
9. Turn it on, paste the **Client ID** and **Client Secret**, and hit Save.

## Step 5: How to Run and Test
1. Make sure your Next.js server is running: `npm run dev` in your terminal.
2. Go to `http://localhost:3000/auth/login`.
3. Click **Continue with Google**.
4. You should be redirected back to the Dashboard page, and your name/avatar should appear!
5. **Multi-User Test**: 
   - Open an Incognito window.
   - Go to `http://localhost:3000` and sign in with a *different* Google account.
   - Play around with flashcards and quizzes.
   - See that your progress is entirely isolated from the first account!
