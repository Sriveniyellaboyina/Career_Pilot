import { useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  Button
} from "@/components/ui/button";

import {
  Input
} from "@/components/ui/input";

import {
  Label
} from "@/components/ui/label";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";

import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff
} from "lucide-react";

import authHero from "@/assets/auth-hero.jpg";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail
} from "firebase/auth";

import { auth } from "@/firebase";

const Auth = () => {

  const navigate = useNavigate();

  // ======================================
  // STATES
  // ======================================
  const [tab, setTab] =
    useState("login");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [name, setName] =
    useState("");

  // ======================================
  // SHOW PASSWORD STATES
  // ======================================
  const [showLoginPassword, setShowLoginPassword] =
    useState(false);

  const [showSignupPassword, setShowSignupPassword] =
    useState(false);

  // ======================================
  // FORGOT PASSWORD
  // ======================================
  const handleForgotPassword = async () => {

    if (!email) {

      alert(
        "Please enter your email first"
      );

      return;
    }

    try {

      await sendPasswordResetEmail(
        auth,
        email
      );

      alert(
        "Password reset email sent successfully"
      );

    } catch (error: any) {

      console.log(error);

      alert(error.message);
    }
  };

  // ======================================
  // AUTH SUBMIT
  // ======================================
  const submit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      let userCred: any;

      // ======================================
      // SIGNUP
      // ======================================
      if (tab === "signup") {

        userCred =
          await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );

        await updateProfile(
          userCred.user,
          {
            displayName: name
          }
        );
      }

      // ======================================
      // LOGIN
      // ======================================
      else {

        userCred =
          await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
      }

      // ======================================
      // SAVE USER
      // ======================================
      const user = {

        name:
          userCred.user.displayName ||
          name ||
          "User",

        email:
          userCred.user.email
      };

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      // ======================================
      // REDIRECT
      // ======================================
      navigate(
        "/dashboard",
        {
          replace: true
        }
      );

    } catch (err: any) {

      alert(err.message);
    }
  };

  return (

    <div className="
      min-h-screen
      w-full
      flex
      items-center
      justify-center
      bg-gradient-to-br
      from-blue-50
      via-purple-50
      to-cyan-50
      dark:from-slate-950
      dark:via-slate-900
      dark:to-slate-950
      p-6
    ">

      {/* ====================================== */}
      {/* MAIN CONTAINER */}
      {/* ====================================== */}
      <div className="
        w-full
        max-w-7xl
        grid
        lg:grid-cols-2
        overflow-hidden
        rounded-[40px]
        bg-white/60
        dark:bg-slate-900/70
        backdrop-blur-2xl
        border
        border-white/30
        shadow-2xl
      ">

        {/* ====================================== */}
        {/* LEFT SIDE */}
        {/* ====================================== */}
        <div className="
          hidden
          lg:flex
          flex-col
          justify-center
          items-center
          p-12
          bg-gradient-to-br
          from-blue-50
          via-purple-50
          to-cyan-50
          dark:from-slate-900
          dark:via-slate-950
          dark:to-slate-900
        ">

          <img
            src={authHero}
            alt="Auth Hero"
            className="
              w-full
              max-w-md
              drop-shadow-2xl
            "
          />

          <h1 className="
            mt-10
            text-5xl
            font-extrabold
            text-center
            leading-tight
          ">

            <span className="
              bg-gradient-to-r
              from-blue-600
              to-purple-600
              bg-clip-text
              text-transparent
            ">
              AI-Powered
            </span>

            <br />

            Skill Verification

          </h1>

          <p className="
            mt-5
            text-center
            text-muted-foreground
            text-lg
            max-w-md
          ">

            Build your career journey with
            AI-based resume analysis,
            interview preparation,
            and smart job matching.

          </p>

        </div>

        {/* ====================================== */}
        {/* RIGHT SIDE */}
        {/* ====================================== */}
        <div className="
          flex
          items-center
          justify-center
          p-6
          md:p-12
        ">

          <div className="
            w-full
            max-w-md
            bg-white/70
            dark:bg-slate-900/80
            backdrop-blur-2xl
            rounded-3xl
            border
            border-white/30
            shadow-xl
            p-8
          ">

            {/* HEADER */}
            <div className="mb-8">

              <h2 className="
                text-4xl
                font-bold
              ">
                Welcome back
              </h2>

              <p className="
                text-muted-foreground
                mt-2
              ">
                Sign in to continue your career journey
              </p>

            </div>

            {/* ====================================== */}
            {/* TABS */}
            {/* ====================================== */}
            <Tabs
              value={tab}
              onValueChange={setTab}
            >

              <TabsList className="
                grid
                grid-cols-2
                mb-8
                rounded-2xl
                h-14
                bg-muted/60
              ">

                <TabsTrigger
                  value="login"
                  className="
                    rounded-xl
                    text-base
                  "
                >
                  Login
                </TabsTrigger>

                <TabsTrigger
                  value="signup"
                  className="
                    rounded-xl
                    text-base
                  "
                >
                  Sign up
                </TabsTrigger>

              </TabsList>

              {/* ====================================== */}
              {/* LOGIN */}
              {/* ====================================== */}
              <TabsContent value="login">

                <form
                  onSubmit={submit}
                  className="space-y-5"
                >

                  {/* EMAIL */}
                  <div>

                    <Label className="mb-2 block">
                      Email
                    </Label>

                    <div className="relative">

                      <Mail className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        w-5
                        h-5
                        text-muted-foreground
                      " />

                      <Input
                        value={email}
                        onChange={(e) =>
                          setEmail(
                            e.target.value
                          )
                        }
                        type="email"
                        placeholder="you@careerpilot.ai"
                        required
                        className="
                          h-14
                          pl-12
                          rounded-2xl
                          bg-background/70
                        "
                      />

                    </div>

                  </div>

                  {/* PASSWORD */}
                  <div>

                    <Label className="mb-2 block">
                      Password
                    </Label>

                    <div className="relative">

                      <Lock className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        w-5
                        h-5
                        text-muted-foreground
                      " />

                      <Input
                        value={password}
                        onChange={(e) =>
                          setPassword(
                            e.target.value
                          )
                        }

                        type={
                          showLoginPassword
                            ? "text"
                            : "password"
                        }

                        placeholder="••••••••"

                        required

                        className="
                          h-14
                          pl-12
                          pr-12
                          rounded-2xl
                          bg-background/70
                        "
                      />

                      <button
                        type="button"

                        onClick={() =>
                          setShowLoginPassword(
                            !showLoginPassword
                          )
                        }

                        className="
                          absolute
                          right-4
                          top-1/2
                          -translate-y-1/2
                          text-muted-foreground
                        "
                      >

                        {showLoginPassword ? (

                          <EyeOff className="
                            w-5
                            h-5
                          " />

                        ) : (

                          <Eye className="
                            w-5
                            h-5
                          " />

                        )}

                      </button>

                    </div>

                  </div>

                  {/* FORGOT PASSWORD */}
                  <div className="
                    flex
                    justify-end
                  ">

                    <button
                      type="button"

                      onClick={handleForgotPassword}

                      className="
                        text-sm
                        text-primary
                        hover:underline
                      "
                    >
                      Forgot password?
                    </button>

                  </div>

                  {/* BUTTON */}
                  <Button
                    type="submit"
                    className="
                      w-full
                      h-14
                      rounded-2xl
                      text-base
                      font-semibold
                      bg-gradient-to-r
                      from-blue-600
                      to-purple-600
                      hover:opacity-90
                    "
                  >
                    Sign in
                  </Button>

                </form>

              </TabsContent>

              {/* ====================================== */}
              {/* SIGNUP */}
              {/* ====================================== */}
              <TabsContent value="signup">

                <form
                  onSubmit={submit}
                  className="space-y-5"
                >

                  {/* NAME */}
                  <div>

                    <Label className="mb-2 block">
                      Full Name
                    </Label>

                    <div className="relative">

                      <User className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        w-5
                        h-5
                        text-muted-foreground
                      " />

                      <Input
                        value={name}
                        onChange={(e) =>
                          setName(
                            e.target.value
                          )
                        }
                        placeholder="John Doe"
                        required
                        className="
                          h-14
                          pl-12
                          rounded-2xl
                          bg-background/70
                        "
                      />

                    </div>

                  </div>

                  {/* EMAIL */}
                  <div>

                    <Label className="mb-2 block">
                      Email
                    </Label>

                    <div className="relative">

                      <Mail className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        w-5
                        h-5
                        text-muted-foreground
                      " />

                      <Input
                        value={email}
                        onChange={(e) =>
                          setEmail(
                            e.target.value
                          )
                        }
                        type="email"
                        placeholder="you@careerpilot.ai"
                        required
                        className="
                          h-14
                          pl-12
                          rounded-2xl
                          bg-background/70
                        "
                      />

                    </div>

                  </div>

                  {/* PASSWORD */}
                  <div>

                    <Label className="mb-2 block">
                      Password
                    </Label>

                    <div className="relative">

                      <Lock className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        w-5
                        h-5
                        text-muted-foreground
                      " />

                      <Input
                        value={password}
                        onChange={(e) =>
                          setPassword(
                            e.target.value
                          )
                        }

                        type={
                          showSignupPassword
                            ? "text"
                            : "password"
                        }

                        placeholder="••••••••"

                        required

                        className="
                          h-14
                          pl-12
                          pr-12
                          rounded-2xl
                          bg-background/70
                        "
                      />

                      <button
                        type="button"

                        onClick={() =>
                          setShowSignupPassword(
                            !showSignupPassword
                          )
                        }

                        className="
                          absolute
                          right-4
                          top-1/2
                          -translate-y-1/2
                          text-muted-foreground
                        "
                      >

                        {showSignupPassword ? (

                          <EyeOff className="
                            w-5
                            h-5
                          " />

                        ) : (

                          <Eye className="
                            w-5
                            h-5
                          " />

                        )}

                      </button>

                    </div>

                  </div>

                  {/* BUTTON */}
                  <Button
                    type="submit"
                    className="
                      w-full
                      h-14
                      rounded-2xl
                      text-base
                      font-semibold
                      bg-gradient-to-r
                      from-blue-600
                      to-purple-600
                      hover:opacity-90
                    "
                  >
                    Create Account
                  </Button>

                </form>

              </TabsContent>

            </Tabs>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Auth;