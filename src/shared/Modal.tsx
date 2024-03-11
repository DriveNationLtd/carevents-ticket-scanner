"use client"
import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useState } from 'react'

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
    children,
    isOpen,
    onClose,
    title
}) => {
    function closeModal() {
        onClose();
    }

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 flex items-center justify-center z-50"
                onClose={closeModal}
            >
                <Dialog.Overlay className="fixed inset-0 bg-black/50" />
                <div className="relative max-w-md w-full bg-transparent rounded-2xl shadow-xl transition-all">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className="p-2 text-left">
                            {title && (
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    {title}
                                </Dialog.Title>
                            )}
                            {children}
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    )

}

export default Modal;