import React, { useRef, useEffect } from 'react';
import $ from 'jquery';

function Dialog(props) {
  const modalRef = useRef(null);

  useEffect(() => {
    $(modalRef.current).hide();
  }, [])

  const hideScreen = () => {
    $(modalRef.current).fadeIn(200);
    document.getElementsByTagName('html')[0].style.overflow = 'hidden';
  }

  const showScreen = () => {
    $(modalRef.current).fadeOut(200);
    document.getElementsByTagName('html')[0].style.overflow = 'auto';
  }

  let theChild = undefined;

  if (props.model === true) {
    hideScreen();
  } else {
    showScreen();
  }

  theChild = (
    <div
      ref={modalRef}
      style={{
        overflow: 'scroll',
        position: 'absolute',
        top: '0',
        bottom: '0',
        left: '0',
        right: '0',
        zIndex: props.zIndex ? props.zIndex : 20,
        width: '100vw',
        backgroundColor: props.backgroundColor ? props.backgroundColor : 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ backgroundColor: props.noBg ? '' : 'white', borderRadius: '20px', padding: '20px' }}>
        {props.children}
      </div>
    </div>
  )

  return <div>{theChild}</div>;
}

export default Dialog;