import { CSSProperties, Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';

interface CloseIconProps {
   color?: string
   height?: number
}
const CloseIcon = ({color ,...rest} : CloseIconProps) => {
      return (
         <svg
            data-testid="close-icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={color ?? '#434343'}
            xmlns="http://www.w3.org/2000/svg"
            {...rest}
         >
           <g data-name="Layer 2">
           <path
             d="m13.41 12 4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z"
             data-name="close"
             />
            </g>
        </svg>
      )
}

interface ModalProps {
  children: React.ReactNode;
  visible?: boolean;
  bodyClassName?: string;
  onClose: () => void;
  shouldShowCloseIcon?: boolean;
  closeClassName?: string;
  title?: string;
  bodyStyle?: CSSProperties;
  headerStyle?: CSSProperties;
  bodyWrapperClassName?: string;
  titleClassName?: string;
  titleStyle?: CSSProperties;
  shouldShowHeader?: boolean;
  disableBackDrop?: boolean;
  bodyWrapperContentClassName?: string;
  overlayClassName?: string;
  headerClassName?: string;
}

export function Modal({
  children,
  visible = false,
  bodyClassName = '',
  onClose,
  shouldShowCloseIcon = true,
  closeClassName,
  headerClassName = '',
  title,
  bodyStyle,
  headerStyle = {},
  titleClassName,
  bodyWrapperClassName = '',
  bodyWrapperContentClassName = 'min-h-full h-full',
  titleStyle,
  shouldShowHeader = true,
  disableBackDrop = false,
  overlayClassName,
}: ModalProps) {
  const cancelButtonRef = useRef(null);

  const _handleBackDrop = () => null;

  return (
    <Transition.Root show={visible} as={Fragment}>
      <Dialog
        as="div"
        className="relative  z-30"
        initialFocus={cancelButtonRef}
        onClose={disableBackDrop ? _handleBackDrop : onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div
            className={`fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity ${overlayClassName}`}
          />
        </Transition.Child>

        <div className={`fixed z-10 inset-0 overflow-y-auto ${bodyWrapperClassName}`}>
          <div
            className={`flex items-center sm:items-center justify-center  text-center sm:p-0 ${bodyWrapperContentClassName}`}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <Dialog.Panel
                className={`relative bg-white text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-[600px] sm:w-full ${bodyClassName}`}
                style={bodyStyle}>
                {shouldShowHeader && (
                  <>
                    {title && (
                      <div
                        data-testid={title}
                        className={`w-full items-center flex justify-between p-4 ${headerClassName}`}
                        style={headerStyle}>
                        <div className={titleClassName} style={titleStyle}>
                          {title}
                        </div>
                      </div>
                    )}
                    {shouldShowCloseIcon && (
                      <div
                        className={`absolute right-4 top-4 w-6 h-6 cursor-pointer z-50 flex justify-center items-center bg-white opacity-50 rounded-full active:bg-slate-200 ${closeClassName}`}
                        onClick={onClose}>
                        <CloseIcon height={32} />
                      </div>
                    )}
                  </>
                )}
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
