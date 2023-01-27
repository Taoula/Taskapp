import { Fragment, useRef, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { UserCircle } from "phosphor-react";
import AuthContext from "../../context/auth-context";
import axios from "axios";

export default function LogoutDialogue({ logoutDialogue, setLogoutDialogue }) {
  const { getLoggedIn } = useContext(AuthContext);
  const history = useNavigate();

  const cancelButtonRef = useRef(null);

  async function logOut() {
    await axios.get("http://localhost:8282/auth/logout");
    getLoggedIn();
    history("/");
  }

  return (
    <Transition.Root show={logoutDialogue} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-30"
        initialFocus={cancelButtonRef}
        onClose={setLogoutDialogue}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:w-full sm:max-w-md p-20">
                <div>
                  <div className="justify-center flex">
                    {/* <span className="bg-sky-100 bg-opacity-50 p-2 rounded-full text-blue-600 border border-blue-600"> */}
                      <UserCircle size={75} weight="duotone" className="text-gray-500"/>
                    {/* </span> */}
                  </div>
                  <div className="flex-col text-center">
                    <h1 className="text-2xl pt-8">Confirm Logout</h1>
                    <p className="text-lg font-light text-gray-500 pt-2">
                      Are you sure you want to logout?
                    </p>
                  </div>
                  <div className="flex space-x-2 pt-8">
                    <span
                      type="button"
                      className="border px-4 py-2 w-full text-md rounded-md text-center text-gray-500 font-normal hover:bg-sidebarColor hover:text-gray-900"
                      onClick={() => setLogoutDialogue(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </span>
                    <span
                      type="button"
                      className="bg-red-500 text-white w-full px-4 py-2 text-md rounded-md text-center hover:bg-red-600"
                      onClick={() => logOut()}
                    >
                      Logout
                    </span>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
