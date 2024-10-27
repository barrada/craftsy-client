<!-- componenets/sliders/RegCarousel.vue -->
<script setup>
import emblaCarouselVue from "embla-carousel-vue";

const [emblaRef] = emblaCarouselVue();
</script>

<template>
  <div class="embla" ref="emblaRef">
    <div class="embla__container">
      <div class="embla__slide"> <NuxtImg src="registration_slides/4.webp"/> </div>
      <div class="embla__slide"> <NuxtImg src="registration_slides/2.png"/> </div>
      <div class="embla__slide"> <NuxtImg src="registration_slides/9.jpeg"/> </div>
    </div>
  </div>
</template>

<style scoped>
.embla {
  overflow: hidden;
}
.embla__container {
  display: flex;
}
.embla__slide {
  flex: 0 0 100%;
  min-width: 0;
}
</style>

<!-- 
src="registration_slides/1.jpg" src="registration_slides/2.png"
src="registration_slides/3.jpg" src="registration_slides/4.webp"
src="registration_slides/5.jpeg" -->