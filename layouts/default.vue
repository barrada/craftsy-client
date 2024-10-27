<template>
  <div class="wrapper flex flex-col min-h-screen bg-gray-100">
    <HeaderAppHeader />

    <main class="container mx-auto bg-gray-100 p-4 flex-grow">
      <slot />
    </main>

    <FooterAppFooter class="mt-auto bg-footer-bg" />
  </div>
</template>
