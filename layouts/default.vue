<template>
  <div class="wrapper flex flex-col min-h-screen bg-red-500">
    <HeaderAppHeader />

    <main class="container mx-auto bg-red-400 p-4 flex-grow">
      <slot />
    </main>

    <FooterAppFooter class="mt-auto bg-footer-bg" />
  </div>
</template>
