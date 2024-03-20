import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "../components/shop";
import { supabase } from "../utils/supabase";

export default function Register() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const doLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw new Error(error.message);
    console.log(data);
    router.reload();
  };

  return (
    <>
      <h1>ログイン</h1>
      <div>
        <div>
          <form>
            <label>メールアドレス：</label>
            <input
              type="email"
              name="email"
              style={{ height: 50, fontSize: "1.2rem" }}
              onChange={(e) => setEmail(e.target.value)}
            />
          </form>
          <form>
            <label>パスワード：</label>
            <input
              type="password"
              name="password"
              style={{ height: 50, fontSize: "1.2rem" }}
              onChange={(e) => setPassword(e.target.value)}
            />
          </form>
          <button
            style={{ width: 220 }}
            color="primary"
            onClick={() => {
              doLogin();
            }}
          >
            ログイン
          </button>
        </div>
      </div>
    </>
  );
}
