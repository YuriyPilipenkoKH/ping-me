
import React from 'react'
import { ModalBaseTypes } from '../../types/modalTypes';
import { cn } from '../../lib/cn';
import { useChatStore } from '../../store/useChatStore';

interface MainModalProps {
  modalProps: ModalBaseTypes
  messageId: string
  receiverId?: string
}

const MainModal: React.FC<MainModalProps> = ({
  modalProps, 
  messageId,
  receiverId}) => {
  const {deleteMessage} = useChatStore()
  const {
    modalName, 
    title,
} = modalProps

  const data = {  messageId,    receiverId }
  const click = () => {
    const modal = document.getElementById('my_modal_3') as HTMLDialogElement | null;
    if (modal) {
      modal.showModal();
    } else {
      console.error("Modal element not found");
    }
  }

  const  confirm =async() => {
    if(data ) await deleteMessage(data )
  }
  return (
  <>
   <button 
   className={cn("btn",
    modalName === 'DeletingMessageConfirm' && 'hidden'
   )} onClick={click}>open modal</button>

    <dialog id="my_modal_3" className="modal ">
  
      <div className="modal-box flex flex-col items-center justify-between gap-10  w-48 py-16 md:flex md:flex-row md:py-8 md:px-12 md:w-[400px]">
          <div>
            <h3 className="font-bold text-lg">{title}</h3>
            {/* <span>{id}</span> */}
          </div>
        <form method="dialog"
        onSubmit={confirm}>
          
          {modalName === 'DeletingMessageConfirm' && (
            <button 
            className='btn btn-secondary text-lg'
            >
              Confirm</button>
            )}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
      </div>
    </dialog>
  </>
  )


  }



export default MainModal