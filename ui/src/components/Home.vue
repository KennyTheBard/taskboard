<template>
    <div>
        <h1>Boards</h1>
        <div class="grid-container">
          <div class="item" v-for="board in boards" :key="board.id">
            <h3>{{ Sboard.name }}</h3>
            <router-link :to="'/board/' + board.id">
              Go to board
            </router-link>
            <button v-on:click="deleteBoard(board.id)">
              Delete
            </button>
          </div>
        </div>

        <div>
          <form @submit="createBoard">
            <label>
              Create new board:
            </label>
            <input type="text" v-model="boardName"/>
            <input type="submit" value="Create"/>
            <p v-if="error">
              <b>{{ error }}</b>
            </p>
          </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Home',
  data () {
    return {
      boards: null,
      boardName: null,
      error: null,
    }
  },
  mounted () {
    this.load();
  },
  methods: {
    createBoard : function(e) {
      e.preventDefault();

      this.error = this.boardName ? null : 'No board name provided';

      if (!this.error) {
        axios
          .post('http://localhost:3000/api/board', {
            name: this.boardName
          })
          .then(response => {
            if (response.status === 201) {
              this.boardName = null;
              this.load();
            }
          });
      }
    },
    load : function() {
      axios
        .get('http://localhost:3000/api/board')
        .then(response => (this.boards = response.data))
    },
    deleteBoard : function(id) {
        axios
          .delete(`http://localhost:3000/api/board/${id}`)
          .then(response => this.load());
      
    }
  }
}
</script>

<style>
.grid-container {
  display: grid;
  grid-template-columns: auto auto auto auto;
  grid-gap: 15px;
  padding: 40px;
}

.item {
  width: 250px;
  height: 150px;
  border-radius: 0px;
  border: 3px solid rgba(0, 0, 0, 0.5);
  padding: 30px;
}
</style>
