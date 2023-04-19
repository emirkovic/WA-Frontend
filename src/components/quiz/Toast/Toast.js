import React, { useEffect, useRef } from 'react';
import $ from 'jquery';

function Toast(props) {
  const toastRef = useRef(null);

  useEffect(() => {
    $(toastRef.current).hide();
  }, [])

  const hideScreen = () => {
    $(toastRef.current).fadeIn(200);
    document.documentElement.style.overflow = 'hidden';
  }

  const showScreen = () => {
    $(toastRef.current).fadeOut(200);
    document.documentElement.style.overflow = 'auto';
  }

  useEffect(() => {
    if (props.model === true) {
      hideScreen();
    } else {
      showScreen();
    }
  }, [props.model])

  return (
    <div>
      <div
        ref={toastRef}
        style={{
          overflow: 'scroll',
          position: 'absolute',
          top: '15px',
          right: '15px',
          zIndex: props.zIndex || 20,
          backgroundColor: props.backgroundColor || '#30D158',
          width: 'fit-content',
          color: 'white',
          borderRadius: '5px',
          padding: '20px 30px',
        }}
      >
        {props.message}
      </div>
    </div>
  )
}

export default Toast;