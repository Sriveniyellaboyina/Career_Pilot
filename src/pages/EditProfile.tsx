import React, {
  useEffect,
  useState
} from "react";

import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import {
  User,
  Mail,
  Save
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Avatar,
  AvatarFallback
} from "@/components/ui/avatar";

import {
  updateProfile
} from "firebase/auth";

import { auth } from "../firebase";

const EditProfile = () => {

  const navigate = useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // ======================================
  // LOAD USER
  // ======================================
  useEffect(() => {

    const user =
      auth.currentUser;

    if (user) {

      setName(
        user.displayName || ""
      );

      setEmail(
        user.email || ""
      );
    }

  }, []);

  // ======================================
  // SAVE PROFILE
  // ======================================
  const saveProfile =
    async () => {

      try {

        setLoading(true);

        const user =
          auth.currentUser;

        if (!user) {

          alert("User not found");

          return;
        }

        // ============================
        // UPDATE FIREBASE PROFILE
        // ============================
        await updateProfile(
          user,
          {
            displayName: name
          }
        );

        alert(
          "Profile Updated Successfully"
        );

        navigate("/profile");

      } catch (error) {

        console.log(error);

        alert(
          "Failed to update profile"
        );

      } finally {

        setLoading(false);
      }
    };

  return (

    <div className="
      min-h-screen
      flex
      items-center
      justify-center
      p-6
    ">

      <motion.div

        initial={{
          opacity: 0,
          y: 20
        }}

        animate={{
          opacity: 1,
          y: 0
        }}

        className="
          glass-card
          w-full
          max-w-2xl
          p-8
          rounded-3xl
          space-y-6
        "
      >

        {/* HEADER */}
        <div className="
          text-center
        ">

          <Avatar className="
            w-24
            h-24
            mx-auto
            mb-4
          ">

            <AvatarFallback className="
              bg-gradient-to-r
              from-blue-500
              to-purple-500
              text-white
              text-3xl
              font-bold
            ">

              {name
                ?.charAt(0)
                ?.toUpperCase() || "U"}

            </AvatarFallback>

          </Avatar>

          <h1 className="
            text-3xl
            font-bold
          ">
            Edit Profile
          </h1>

          <p className="
            text-muted-foreground
            mt-2
          ">
            Update your profile details
          </p>

        </div>

        {/* NAME */}
        <div className="
          space-y-2
        ">

          <label className="
            text-sm
            font-semibold
          ">
            Full Name
          </label>

          <div className="
            flex
            items-center
            border
            rounded-xl
            px-4
            py-3
            bg-background
          ">

            <User className="
              w-5
              h-5
              text-muted-foreground
              mr-3
            " />

            <input

              type="text"

              value={name}

              onChange={(e) =>
                setName(
                  e.target.value
                )
              }

              className="
                w-full
                outline-none
                bg-transparent
              "

              placeholder="Enter name"
            />

          </div>

        </div>

        {/* EMAIL */}
        <div className="
          space-y-2
        ">

          <label className="
            text-sm
            font-semibold
          ">
            Email
          </label>

          <div className="
            flex
            items-center
            border
            rounded-xl
            px-4
            py-3
            bg-secondary/30
          ">

            <Mail className="
              w-5
              h-5
              text-muted-foreground
              mr-3
            " />

            <input

              type="email"

              value={email}

              disabled

              className="
                w-full
                outline-none
                bg-transparent
                cursor-not-allowed
              "
            />

          </div>

        </div>

        {/* BUTTON */}
        <Button

          onClick={saveProfile}

          disabled={loading}

          className="
            w-full
            bg-gradient-primary
            glow-shadow
            py-6
            text-lg
          "
        >

          <Save className="
            w-5
            h-5
            mr-2
          " />

          {loading
            ? "Saving..."
            : "Save Changes"}

        </Button>

      </motion.div>

    </div>
  );
};

export default EditProfile;