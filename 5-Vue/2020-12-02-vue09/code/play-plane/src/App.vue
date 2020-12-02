<template>
  <container>
    <!-- <GamePage></GamePage> -->
    <!-- <StartPage></StartPage> -->
    <currentPage @change-page="changePage"></currentPage>
  </container>
</template>

<script>
import StartPage from "./pages/StartPage";
import GamePage from "./pages/GamePage";
import EndPage from "./pages/EndPage";
import { computed, ref } from "vue";
export default {
  components: {
    // StartPage,
    // GamePage,
  },
  setup() {
    // const currentPageName = ref("StartPage");
    // const currentPageName = ref("GamePage");
    const currentPageName = ref("EndPage");

    const currentPage = computed(() => {
      if (currentPageName.value === "StartPage") {
        return StartPage;
      } else if (currentPageName.value === "GamePage") {
        return GamePage;
      } else if (currentPageName.value === "EndPage") {
        return EndPage;
      }
    });

    const changePage = (pageName) => {
      currentPageName.value = pageName;
    };

    return {
      currentPage,
      changePage,
    };

    // return ()=>{
    //   // render

    // }
  },
};
</script>

<style></style>
