<template>
  <transition name='mint-indicator' >
    <div class="app-loading" v-show="show">
      <div class="loading-con">
        <p><span class='mint-indicator-text'> {{text}}</span></p>
      </div>
    </div>
  </transition>
</template>
<script>
  export default {
    name: 'wx-loading',
    props: ['show', 'text'],
    methods: {}
  };
</script>
<style scoped>

  .app-loading {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9999;
  }
  .app-loading .loading-con{
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }

  .mint-indicator {
    -webkit-transition: opacity .2s linear;
    transition: opacity .2s linear;
  }

  .mint-indicator-wrapper {
    top: 50%;
    left: 50%;
    position: fixed;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    box-sizing: border-box;
    text-align: center;
    padding: 20px;
  }

  .mint-indicator-text {
    display: block;
    color: #fff;
    text-align: center;
    margin-top: 10px;
    font-size: 14px;
  }

  .mint-indicator-spin {
    display: inline-block;
    text-align: center;
  }

  .mint-indicator-mask {
    top: 0;
    left: 0;
    position: fixed;
    width: 100%;
    height: 100%;
    opacity: 0;
    background: transparent;
  }

  .mint-indicator-enter, .mint-indicator-leave-active {
    opacity: 0;
  }

  .mint-spinner-snake {
    -webkit-animation: mint-spinner-rotate 0.8s infinite linear;
    animation: mint-spinner-rotate 0.8s infinite linear;
    border: 4px solid transparent;
    border-radius: 50%;
    border-top-color: rgb(204, 204, 204);
    border-left-color: rgb(204, 204, 204);
    border-bottom-color: rgb(204, 204, 204);
    height: 30px;
    width: 30px;
  }

  @-webkit-keyframes mint-spinner-rotate {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @keyframes mint-spinner-rotate {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  .mint-spinner-double-bounce {
    position: relative;
  }

  .mint-spinner-double-bounce-bounce1, .mint-spinner-double-bounce-bounce2 {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;
    -webkit-animation: mint-spinner-double-bounce 2.0s infinite ease-in-out;
    animation: mint-spinner-double-bounce 2.0s infinite ease-in-out;
  }

  .mint-spinner-double-bounce-bounce2 {
    -webkit-animation-delay: -1.0s;
    animation-delay: -1.0s;
  }

  @-webkit-keyframes mint-spinner-double-bounce {
    0%, 100% {
      -webkit-transform: scale(0.0);
      transform: scale(0.0);
    }
    50% {
      -webkit-transform: scale(1.0);
      transform: scale(1.0);
    }
  }

  @keyframes mint-spinner-double-bounce {
    0%, 100% {
      -webkit-transform: scale(0.0);
      transform: scale(0.0);
    }
    50% {
      -webkit-transform: scale(1.0);
      transform: scale(1.0);
    }
  }

  .mint-spinner-triple-bounce {
  }

  .mint-spinner-triple-bounce-bounce1, .mint-spinner-triple-bounce-bounce2, .mint-spinner-triple-bounce-bounce3 {
    border-radius: 100%;
    display: inline-block;
    -webkit-animation: mint-spinner-triple-bounce 1.4s infinite ease-in-out both;
    animation: mint-spinner-triple-bounce 1.4s infinite ease-in-out both;
  }

  .mint-spinner-triple-bounce-bounce1 {
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }

  .mint-spinner-triple-bounce-bounce2 {
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
  }

  @-webkit-keyframes mint-spinner-triple-bounce {
    0%, 80%, 100% {
      -webkit-transform: scale(0);
      transform: scale(0);
    }
    40% {
      -webkit-transform: scale(1.0);
      transform: scale(1.0);
    }
  }

  @keyframes mint-spinner-triple-bounce {
    0%, 80%, 100% {
      -webkit-transform: scale(0);
      transform: scale(0);
    }
    40% {
      -webkit-transform: scale(1.0);
      transform: scale(1.0);
    }
  }

  .mint-spinner-fading-circle {
    position: relative
  }

  .mint-spinner-fading-circle-circle {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: absolute
  }

  .mint-spinner-fading-circle-circle::before {
    content: " ";
    display: block;
    margin: 0 auto;
    width: 15%;
    height: 15%;
    border-radius: 100%;
    -webkit-animation: mint-fading-circle 1.2s infinite ease-in-out both;
    animation: mint-fading-circle 1.2s infinite ease-in-out both
  }

  .mint-spinner-fading-circle-circle.is-circle2 {
    -webkit-transform: rotate(30deg);
    transform: rotate(30deg)
  }

  .mint-spinner-fading-circle-circle.is-circle2::before {
    -webkit-animation-delay: -1.1s;
    animation-delay: -1.1s
  }

  .mint-spinner-fading-circle-circle.is-circle3 {
    -webkit-transform: rotate(60deg);
    transform: rotate(60deg)
  }

  .mint-spinner-fading-circle-circle.is-circle3::before {
    -webkit-animation-delay: -1s;
    animation-delay: -1s
  }

  .mint-spinner-fading-circle-circle.is-circle4 {
    -webkit-transform: rotate(90deg);
    transform: rotate(90deg)
  }

  .mint-spinner-fading-circle-circle.is-circle4::before {
    -webkit-animation-delay: -0.9s;
    animation-delay: -0.9s
  }

  .mint-spinner-fading-circle-circle.is-circle5 {
    -webkit-transform: rotate(120deg);
    transform: rotate(120deg)
  }

  .mint-spinner-fading-circle-circle.is-circle5::before {
    -webkit-animation-delay: -0.8s;
    animation-delay: -0.8s
  }

  .mint-spinner-fading-circle-circle.is-circle6 {
    -webkit-transform: rotate(150deg);
    transform: rotate(150deg)
  }

  .mint-spinner-fading-circle-circle.is-circle6::before {
    -webkit-animation-delay: -0.7s;
    animation-delay: -0.7s
  }

  .mint-spinner-fading-circle-circle.is-circle7 {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg)
  }

  .mint-spinner-fading-circle-circle.is-circle7::before {
    -webkit-animation-delay: -0.6s;
    animation-delay: -0.6s
  }

  .mint-spinner-fading-circle-circle.is-circle8 {
    -webkit-transform: rotate(210deg);
    transform: rotate(210deg)
  }

  .mint-spinner-fading-circle-circle.is-circle8::before {
    -webkit-animation-delay: -0.5s;
    animation-delay: -0.5s
  }

  .mint-spinner-fading-circle-circle.is-circle9 {
    -webkit-transform: rotate(240deg);
    transform: rotate(240deg)
  }

  .mint-spinner-fading-circle-circle.is-circle9::before {
    -webkit-animation-delay: -0.4s;
    animation-delay: -0.4s
  }

  .mint-spinner-fading-circle-circle.is-circle10 {
    -webkit-transform: rotate(270deg);
    transform: rotate(270deg)
  }

  .mint-spinner-fading-circle-circle.is-circle10::before {
    -webkit-animation-delay: -0.3s;
    animation-delay: -0.3s
  }

  .mint-spinner-fading-circle-circle.is-circle11 {
    -webkit-transform: rotate(300deg);
    transform: rotate(300deg)
  }

  .mint-spinner-fading-circle-circle.is-circle11::before {
    -webkit-animation-delay: -0.2s;
    animation-delay: -0.2s
  }

  .mint-spinner-fading-circle-circle.is-circle12 {
    -webkit-transform: rotate(330deg);
    transform: rotate(330deg)
  }

  .mint-spinner-fading-circle-circle.is-circle12::before {
    -webkit-animation-delay: -0.1s;
    animation-delay: -0.1s
  }

  @-webkit-keyframes mint-fading-circle {
    0%, 39%, 100% {
      opacity: 0
    }
    40% {
      opacity: 1
    }
  }

  @keyframes mint-fading-circle {
    0%, 39%, 100% {
      opacity: 0
    }
    40% {
      opacity: 1
    }
  }

  #wx-loading {
    position: fixed;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    top: 0;
    bottom: 0;
  }

</style>
