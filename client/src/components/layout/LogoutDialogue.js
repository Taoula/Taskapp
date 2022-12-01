import { Fragment, useRef, useState, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { Warning } from "phosphor-react";
import useToggle from "../../hooks/use-toggle";
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
        className="relative z-10"
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-md bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-8 py-5">
                  <div className="flex items-center space-x-4">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10 text-red-500">
                      <Warning size={20} />
                    </div>
                    <div className="block">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-normal text-gray-900"
                      >
                        Confirm logout
                      </Dialog.Title>
                      <p className="text-sm font-normal text-gray-500">
                        Are you sure you want to log out?
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 py-5 px-8 flex justify-end space-x-2">
                  <button
                    type="button"
                    className="border px-4 py-2 rounded-md text-xs font-normal bg-opacity-50 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
                    onClick={() => setLogoutDialogue(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="border px-4 py-2 rounded-md text-xs font-normal bg-opacity-50 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                    onClick={() => logOut()}
                  >
                    Logout
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
