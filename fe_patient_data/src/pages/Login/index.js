import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../../assets";
import Api from "../../Api";
import toast from "react-hot-toast";
import Modal from "../../components/Modal";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  const [modalKeyID, setModalKeyID] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("modalKeyID changed:", modalKeyID);
    getKey()
  }, [modalKeyID]); // useEffect akan dipanggil setiap kali modalKeyID berubah

  const login = async () => {
    try {
      const response = await Api.Login(email, password);
      localStorage.setItem("token", response.data.accessToken);
      setModalKeyID(true);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };

  const getKey = async () => {
    try {
      const response = await Api.GetCode(
        localStorage.getItem("token")
      );
      setCode(response.data.data.code)
      console.log(code)
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  }

  return (
    <div>
      <div>
        <Modal
          activeModal={modalKeyID}
          title={""}
          buttonClose={() => navigate("/dashboard")}
          width={"500px"}
          content={
            <div className="flex flex-col items-center justify-center h-full">
              <div className="mt-6 flex flex-col justify-center items-center gap-5">
                <div className="text-sm space-y-2">
                  <h1 className="font-medium">
                    Please Save the Key Id to Access Decrypted Data
                  </h1>
                </div>
                <h2 className="w-full border text-center outline-none shadow-md px-2 py-2 rounded-md font-medium text-2xl">
                  {code}
                </h2>
                <div className="flex item-center justify-center gap-3 mt-5">
                  <button
                    onClick={() =>
                      navigate(
                        "/dashboard",
                        toast("Welcome Again!", { icon: "✨" })
                      )
                    }
                    className="bg-[#015995] text-white text-sm rounded-[6px] w-[100px] py-[10px] px-[25px]"
                  >
                    Okey
                  </button>
                </div>
              </div>
            </div>
          }
        />
      </div>

      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-36 mx-auto min-h-screen">
          <div className="w-full bg-white rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 md:mt-0 sm:max-w-md xl:p-0  ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div className="flex flex-col items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <img className="rounded-full w-20 h-20" src={Logo} alt="logo" />
                <span>Patient Data Application</span>
              </div>

              <div className="space-y-4 md:space-y-6">
                <div>
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Username"
                    required=""
                  />
                </div>
                <div>
                  <label
                    for="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-6"
                    required=""
                  />
                </div>
                {/* <h1 className="text-sm text-gray-900 dark:text-white">
                  Don't Have Account?{" "}
                  <span>
                    <Link
                      to={"/register"}
                      className=" hover:text-blue-700 font-semibold"
                    >
                      SignUp Now!
                    </Link>
                  </span>
                </h1> */}
                <button
                  onClick={login}
                  // onClick={() => setModalKeyID(!modalKeyID)}
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Log in
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
