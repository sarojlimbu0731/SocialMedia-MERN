import { Modal } from "@mantine/core";
import PostShare from "../postShare/PostShare";

function ShareModal({ modalOpen, setModalOpen }) {
  return (
    <>
      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        size='50%'
      >
        <PostShare />
      </Modal>
    </>
  );
}

export default ShareModal;
