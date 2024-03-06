<template>
  <div class="page__content">
    <header>
      <Vue3Lottie :animationData="AnimationCat" :height="150" :width="'100%'" />
    </header>
    <main>
      <div class="dogbox">
        <img
          v-if="isDogDone"
          class="animate__animated animate__bounceIn"
          src="../assets/bulle.svg"
          alt=""
        />
        <div
          v-if="isDogDone"
          ref="animatedText"
          class="animate__animated animate__bounceIn text"
        >
          Я твое любовное послание на 8 марта!!!
          <br />
          Введи пароль чтобы получить свой подарок
        </div>
        <Vue3Lottie
          ref="lottieAnimation"
          :animationData="AnimationDogBox"
          :height="250"
          :width="'100%'"
          @onEnterFrame="checkFrame"
          @on-loop-complete="setDogLoop"
        />
      </div>
    </main>
    <footer>
      <Vue3Lottie
        :animationData="AnimationFooterCat"
        :height="150"
        :width="'100%'"
      />
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Vue3Lottie } from "vue3-lottie";
import AnimationCat from "../assets/AnimationCat.json";
import AnimationFooterCat from "../assets/AnimationFooterCat.json";
import AnimationDogBox from "../assets/AnimationDogBox.json";
import "animate.css";

const lottieAnimation = ref(null);
const animatedText = ref<HTMLElement | null>(null);
const isDogDone = ref(false);
const trigger = ref(false);
const frameCounter = ref(0);
const checkFrame = () => {
  if (frameCounter.value > 200) {
    isDogDone.value = true;
    if (!trigger.value) {
      nextTick(() => {
        startTyping();
      });
    }
    trigger.value = true;
    return;
  }
  frameCounter.value++;
};
const startTyping = () => {
  const textElement = animatedText.value;
  if (textElement) {
    const textContent = textElement.textContent?.trim();
    if (textContent !== null) {
      textElement.textContent = "";
      let charIndex = 0;
      const typeInterval = 50
      function type() {
        if (charIndex < (textContent?.length || 0)) {
          if (textElement?.textContent !== null) {
            textElement!.textContent += textContent?.charAt(charIndex);
            charIndex++;
            setTimeout(type, typeInterval);
          }
        }
      }
      type();
    }
  }
};

const setDogLoop = (frame) => {
  lottieAnimation.value?.goToAndPlay(120, true);
};
</script>

<style lang="scss">
body {
  box-sizing: border-box;
  margin: 0%;
  padding: 0;
  max-width: 100vw;
  max-height: 100vh;
  width: 100vw;
  height: 100vh;
  display: grid;
  justify-items: center;
  align-items: start;
  background: transparent;
}
.page {
  &__content {
    width: 100%;
    height: 100vh;
    display: grid;
    justify-items: center;
    align-items: center;
    main {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr;
      justify-items: center;
      .dogbox {
        position: relative;
        img {
          top: -110px;
          left: -55px;
          width: 180px;
          height: 180px;
          position: absolute;
        }
        .text {
          font-size: 0.7em;
          top: -78px;
          left: -15px;
          position: absolute;
          width: 115px;
          color: #6eb669;
        }
      }
    }
    header {
      width: 100%;
      position: fixed;
      top: -50px;
      animation: moveHeader 4s linear infinite;
    }
    footer {
      position: fixed;
      bottom: -40px;
      left: -50px;
      width: 100%;
    }
    @keyframes moveHeader {
      0% {
        transform: translateX(-100vw);
      }
      100% {
        transform: translateX(calc(100vw));
      }
    }
  }
}
</style>
