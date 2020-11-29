<template>
    <div class="row">
        <div class="block">Lorem</div>
    </div>
</template>

<script>
export default {
  name: 'Board',
  data () {
    return {
      info: null
    }
  },
  mounted () {
    axios
      .get('https://localhost:3000/api/board')
      .then(response => (this.boards = response))
  }
}
</script>

<style>
.row {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.block {
  width: 100px;
}
</style>