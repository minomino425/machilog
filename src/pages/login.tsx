import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

import Header from "../components/task";
import { useRouter } from "next/router";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // supabaseのユーザー登録の関数
  const doLogin = async () => {
    // supabaseで用意されているユーザー登録の関数
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw new Error(error.message);
    console.log(data);
    // ログインを反映させるためにリロードさせる
    router.reload();
  };

  return (
    <>
      <div>
        <h1>ログイン</h1>
        <Header />
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
      </div>
    </>
  );
}
