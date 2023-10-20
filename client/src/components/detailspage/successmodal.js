import React from 'react';
import style from '../../styles/modal';

function SuccessModal(props) {
  const closeModal = () => {
    props.close();
  };

  return (
    <>
      <div style={{ width: '100%' }}>
        <button onClick={closeModal} style={style.customStyles.closebar}>
          ×
        </button>
      </div>
      <div style={style.customStyles.success}>Order Placed Successfully!</div>
    </>
  );
}

export default SuccessModal;
