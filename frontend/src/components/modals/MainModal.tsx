
import React from 'react'
import { ModalBaseTypes } from '../../types/modalTypes';
import { cn } from '../../lib/cn';

interface MainModalProps {
  modalProps: ModalBaseTypes
}

const MainModal: React.FC<MainModalProps> = ({modalProps}) => {
  const {
    modalName, 
    title,
} = modalProps
  const click = () => {
    const modal = document.getElementById('my_modal_3') as HTMLDialogElement | null;
    if (modal) {
      modal.showModal();
    } else {
      console.error("Modal element not found");
    }
  }
  return (
  <>
   <button 
   className={cn("btn",
    modalName === 'DeletingMessageConfirm' && 'hidden'
   )} onClick={click}>open modal</button>

    <dialog id="my_modal_3" className="modal ">
  
      <div className="modal-box flex items-center justify-between px-20">
          <h3 className="font-bold text-lg">{title}</h3>
        <form method="dialog">
          {modalName === 'DeletingMessageConfirm' && (
            <button className='btn btn-secondary'>Confirm</button>
            )}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
      </div>
    </dialog>
  </>
  )


  }



export default MainModal