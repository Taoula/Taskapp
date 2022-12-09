import { Fragment, useRef, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { User } from "phosphor-react";
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-md bg-white text-left shadow-xl transition-all sm:w-full sm:max-w-sm p-10">
                <div>
                  <div className="justify-center flex">
                    <span className="bg-yellow-100 bg-opacity-50 p-2 rounded-full text-amber-500 border border-amber-500">
                      <User size={32} />
                    </span>
                  </div>
                  <div className="flex-col text-center">
                    <h1 className="text-xl pt-5">Confirm Logout</h1>
                    <p className="text-sm text-gray-500 pt-1">
                      Are you sure you want to logout?
                    </p>
                  </div>
                  <div className="flex space-x-2 pt-5">
                    <button
                      type="button"
                      className="bg-gray-200 px-4 py-2 w-full rounded-md font-normal hover:bg-gray-300"
                      onClick={() => setLogoutDialogue(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="bg-yellow-500 text-white w-full px-4 py-2 rounded-md font-normal hover:bg-yellow-600"
                      onClick={() => logOut()}
                    >
                      Logout
                    </button>
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
