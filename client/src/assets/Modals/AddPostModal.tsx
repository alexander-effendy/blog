import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react'

interface MyDialogProps {
  isOpen: boolean;
  closeModal: () => void;
  handleTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBodyChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleAddPost: () => void;
}

const MyDialog: React.FC<MyDialogProps> = ({ isOpen, closeModal, handleTitleChange, handleBodyChange, handleAddPost }) => {

  return (
    <>
    <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Make a new post
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-[15px] text-gray-500">
                      Tell us a bit about your day
                    </p>
                  </div>

                  <div className="flex flex-col">
                    <section className="flex flex-col mt-5">
                      <label>Title:</label>
                      <input onChange={handleTitleChange} className="rounded-lg h-[30px] w-full"/>
                    </section>
                    
                    <label className="mt-5">Body:</label>
                    <textarea onChange={handleBodyChange} className="rounded-lg" rows={5} />
                  </div>

                  <div className="mt-4 flex justify-end gap-2">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        closeModal();
                        handleAddPost();
                      }}
                    >
                      Submit
                    </button>
                  </div>
                  
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default MyDialog;