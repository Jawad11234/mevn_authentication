<template>
  <div>
    <NavBar />
    <br /><br />
    <div class="container">
      <Error v-if="error" :msg="error" />
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import NavBar from "@/components/NavBar.vue";
import Error from "@/components/Errors.vue";
export default {
  components: {
    NavBar,
    Error,
  },
  computed: {
    ...mapGetters(["error"]),
  },
};
</script>
<style></style>
