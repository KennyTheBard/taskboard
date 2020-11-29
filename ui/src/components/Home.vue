<template>
    <div>
        <h1>Boards</h1>
        <b-card-group deck>
            <b-card v-for="board in boards" :key="board.id" :title="board.name">
              <router-link :to="'/board/' + board.id">
                Go to board
              </router-link>
            </b-card>
        </b-card-group>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Home',
  data () {
    return {
      boards: null
    }
  },
  mounted () {
    axios
      .get('http://localhost:3000/api/board')
      .then(response => (this.boards = response.data))
  }
}
</script>

<style>

</style>
