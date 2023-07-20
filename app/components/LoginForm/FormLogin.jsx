import { useState } from "react";
import SingInGoogleLogin from "./SingInGoogleLogin";
import SubmitLogin from "./SubmitLogin";
import HeaderLogin from "./HeaderLogin";
import MailLogin from "./MailLogin";
import PasswordLogin from "./PasswordLogin";
import DescriptionLogin from "./DescriptionLogin";
import { formLoginStyles } from "./stylesLogin";

export default function FormLogin({ onSubmit, onGoogle, onFace, clientAction, actionData }) {
  const [sending, setSending] = useState(false);

  const contentStyleDefault = `${formLoginStyles.main} ${formLoginStyles.border} ${formLoginStyles.shadow} ${formLoginStyles.mediaQuery1} ${formLoginStyles.mediaQuery2}`;

  async function handleSubmit(e) {
    setSending(!sending);
    await onSubmit(e);
    setSending(false);
  }

  return (
    <div
      className={`${contentStyleDefault}`}
      data-testid="FormLogin"
    >
      <HeaderLogin />

      <SingInGoogleLogin
        onClickGoogle={onGoogle}
        onClickFace={onFace}
        isSubmit={sending}
      />

      <DescriptionLogin />

      {clientAction?.error || actionData?.error ? (
        <div
          className="font-bold text-center bg-red-200 border-2 border-red-300 rounded-md"
        >
          <p data-testid="error-login" >
            {clientAction?.error || actionData?.error}
          </p>
        </div>
      ) : null}

      <form
        method="post"
        onSubmit={handleSubmit}
        data-cy="login-form"
        data-testid="form-login"
      >
        <div className="content-form">
          <MailLogin />
          <PasswordLogin />

          <SubmitLogin
            isSubmit={sending}
            changeSubmit={setSending}
          />
        </div>
      </form>
    </div>
  )
}