<template>
  <div id="app">
    <h1>测试页面一</h1>
  </div>
</template>

<style lang="scss">
    h1{
        @include clearfix;
        color: $red;
        z-index: z("default");
    }
</style>
