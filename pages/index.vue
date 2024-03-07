<template>
  <div class="page__content">
    <header>
      <Vue3Lottie :animationData="AnimationCat" :height="150" :width="'100%'" />
    </header>
    <main>
      <div v-if="!isPassCorrect" class="dogbox">
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
        ></div>
        <Vue3Lottie
          ref="lottieAnimation"
          :animationData="AnimationDogBox"
          :height="250"
          :width="'100%'"
          @onEnterFrame="checkFrame"
          @on-loop-complete="setDogLoop"
        />
        <input
          v-if="isInput"
          v-model="pass"
          class="animate__animated animate__bounceIn"
          type="text"
        />
        <div v-if="isInput" class="butts animate__animated animate__bounceIn">
          <button class="check" @click="checkpass">Проверить</button>
          <button
            class="check runaway"
            :style="{
              top: runBT > 0 ? runBT + 'px' : null,
              left: runBL > 0 ? runBL + 'px' : null,
            }"
            @click="buttRun"
          >
            Не знаю пароль
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { Vue3Lottie } from "vue3-lottie";
import AnimationCat from "../assets/AnimationCat.json";
import AnimationDogBox from "../assets/AnimationDogBox.json";
import "animate.css";

const lottieAnimation = ref(null);
const animatedText = ref<HTMLElement | null>(null);
const isDogDone = ref(false);
const trigger = ref(false);
const frameCounter = ref(0);
const isInput = ref(false);
const pass = ref("");
const runBT = ref(0);
const runBL = ref(0);
const isPassCorrect = ref(false);

const checkFrame = () => {
  if (frameCounter.value > 200) {
    isDogDone.value = true;
    if (!trigger.value) {
      nextTick(async () => {
        const next1 = await startTyping(
          "Я твое любовное послание на 8 марта!!!"
        );
        if (next1) {
          setTimeout(async () => {
            await startTyping(`Введи пароль чтобы получить подарок!`);
            isInput.value = true;
          }, 1500);
        }
      });
    }
    trigger.value = true;
    return;
  }
  frameCounter.value++;
};
const startTyping = (textToType: string) => {
  return new Promise((resolve, reject) => {
    const textElement = animatedText.value;
    if (textElement && textToType) {
      textElement.textContent = "";
      let charIndex = 0;
      const typeInterval = 50;
      function type() {
        if (charIndex < textToType.length) {
          textElement.textContent += textToType.charAt(charIndex);
          charIndex++;
          setTimeout(type, typeInterval);
        } else {
          resolve(true);
        }
      }
      type();
    } else {
      reject();
    }
  });
};

const buttRun = () => {
  runBT.value = Math.floor(Math.random() * 171);
  runBL.value = Math.floor(Math.random() * 171);
};
const checkpass = async () => {
  if (pass.value.toLowerCase() == "любимая ралия") {
    var mapUrl = "https://maps.app.goo.gl/QNjiDfn7boay7L5y5";
    await startTyping("Пароль принят, перенаправляю тебя на подарок");
    setTimeout(() => {
      window.open(mapUrl);
    }, 1000);
  } else {
    startTyping("Попробуй еще раз =)");
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
  background: url(../assets/back.svg);
  background-size: cover;
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
        .butts {
          display: flex;
          width: 100%;
          height: 40px;
          gap: 15px;
          margin-top: 15px;
          .check {
            border: none;
            background-color: #6eb669;
            border-radius: 12px;
            width: 100%;
            height: 40px;
            color: white;
          }
          .runaway {
            position: relative;
            background-color: #3f703c;
            z-index: 99999;
          }
        }
        .text {
          font-size: 0.9em;
          top: -78px;
          left: -15px;
          position: absolute;
          width: 115px;
          color: #6eb669;
        }
        input {
          width: 100%;
          background: whitesmoke;
          border: none;
          height: 40px;
          border-radius: 10px;
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
      position: absolute;
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
