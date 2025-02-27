import { Link } from "react-router-dom";
import myContext from "../../context/data/myContext";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { auth } from "../../firebase/FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import Loader from "../../components/loader/Loader";
import ReCAPTCHA from "react-google-recaptcha";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isCaptchaSuccessful, setIsCaptchaSuccess] = useState(false);

  function onChange(value) {
    setIsCaptchaSuccess(true);
    console.log("captcha value: ", value);
  }

  const context = useContext(myContext);
  const { loading, setLoading } = context;

  const signin = async () => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("user", JSON.stringify(result));
      alert("Login Successfull");
      window.location.href = "/";
      setLoading(false);
    } catch (error) {
      alert("Login Failed");
      setEmail("");
      setPassword("");
      setLoading(false);
    }
  };

  return (
    <div className=" flex justify-center items-center h-screen">
      {loading && <Loader />}
      <div className=" bg-gray-800 px-10 py-10 rounded-xl ">
        <div className="">
          <h1 className="text-center text-white text-xl mb-4 font-bold">
            Login
          </h1>
        </div>
        <div>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Email"
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Password"
          />
        </div>

{/*         <div className="flex justify-center mb-3">
          <ReCAPTCHA
            theme="dark"
            sitekey="6Lcq97kpAAAAAIqQ0SuPjEVme9PljhPryaH5Uq0T"
            onChange={onChange}
          />
        </div> */}

        <div className=" flex justify-center mb-3">
          <button
{/*             disabled={!isCaptchaSuccessful} */}
            onClick={signin}
            className=" bg-green-400 w-full text-white font-bold px-2 py-2 rounded-lg disabled:opacity-50 "
          >
            Login
          </button>
        </div>
        <div>
          <h2 className="text-white">
            Don't have an account{" "}
            <Link className=" text-yellow-500 font-bold" to={"/signup"}>
              Signup
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Login;
