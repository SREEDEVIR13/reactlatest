import React from "react";
import Footer from "../../components/footer/footer";
import Layout from "../../components/navbar/navbar";
import "./CheckMail.css"

export default function CheckMail() {

  return (
    <>
      <Layout>
        <div className="mail-msg">
          <h3>We have sent the password reset link to your registered email.Please check your mail!</h3>
        </div>
      </Layout>
    </>
  )
}