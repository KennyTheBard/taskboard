<template>
  <div>
    <router-link to="/">
      Home
    </router-link>
    <h1 v-if="!renameBoardMode">{{ board.name }}</h1>

    <button v-if="!renameBoardMode"
            v-on:click="renameBoard()">
      Rename
    </button>

    <input v-if="renameBoardMode" type="text" v-model="board.name"/><br/>

    <button v-if="renameBoardMode"
            v-on:click="updateBoard()">
      Save
    </button>

    <button v-if="renameBoardMode"
            v-on:click="cancelBoardRename()">
      Cancel
    </button>
    <div class="row">
        <div class="block" v-for="list in lists" :key="list.id" >
          <h3 v-if="renameListId !== list.id">{{ list.name }}</h3>
          
          <button v-if="renameListId !== list.id"
                  v-on:click="renameList(list.id)">
            Rename
          </button>

          <button v-if="renameListId !== list.id"
                  v-on:click="deleteList(list.id)">
            Delete
          </button>

          <input v-if="renameListId === list.id" type="text" v-model="list.name"/><br/>

          <button v-if="renameListId === list.id"
                  v-on:click="updateList()">
            Save
          </button>

          <button v-if="renameListId === list.id"
                  v-on:click="cancelListRename()">
            Cancel
          </button>

          <hr>
          <Card v-for="card in list.cards" :key="card.id"
                v-bind:card="card"
                v-bind:listId="list.id"
                v-bind:otherLists="lists.filter(l => l.id !== list.id)"
                @updated="load"
                @seeMore="modalCard = card; $bvModal.show('card-modal')"/>
          <hr>

          <router-link :to="`/board/${board.id}/list/${list.id}/new-card`">
            New card
          </router-link>
        </div>
        <div class="block">
          <form @submit="createList">
            <h3>Create new list:</h3>
            <input type="text" v-model="listName"/>
            <input type="submit" value="Create"/>
            <p v-if="createListError">
              <b>{{ createListError }}</b>
            </p>
          </form>
        </div>
    </div>

    <b-modal v-if="modalCard !== null" :title="`Card #${modalCard.id}`" id="card-modal" hide-footer
              modal-class="wrap-text">
      <h3>{{ modalCard.name }}</h3>
      <p class="my-4">{{ modalCard.description }}</p>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios'
import Card from '@/components/Card'

export default {
  name: 'Board',
  props: ['boardId'],
  components: {
    Card
  },
  data () {
    return {
      board: null,
      lists: [],
      listName: null,
      createListError: null,
      renameListId: null,
      renameBoardMode: false,
      modalCard: null,
    }
  },
  mounted () {
    this.loadAll();
  },
  methods: {
    createList : function(e) {
      e.preventDefault();

      this.createListError = this.listName ? null : 'No list name provided';

      if (!this.createListError) {
        axios
          .post(`http://localhost:3000/api/${this.boardId}/list`, {
            name: this.listName
          })
          .then(response => {
            if (response.status === 201) {
              this.listName = null;
              this.load();
            }
          });
      }
    },
    loadAll : function () {
      axios
        .get(`http://localhost:3000/api/board/${this.boardId}`)
        .then(response => {
          this.board = response.data;

          this.load();
        });
    },
    load : function() {
      axios
        .get(`http://localhost:3000/api/${this.boardId}/list`)
        .then(response => {
          this.lists = [];
          const auxLists = response.data;
          auxLists.forEach(list => {
            axios
              .get(`http://localhost:3000/api/${list.id}/card`)
              .then(response => {
                list.cards = response.data;
                this.lists.push(list);
              });
          })
        });
    },
    renameList : function(id) {
      this.renameListId = id;
    },
    deleteList : function(id) {
      axios
        .delete(`http://localhost:3000/api/${this.boardId}/list/${id}`)
        .then(response => this.load());
    },
    updateList : function () {
      axios
        .put(`http://localhost:3000/api/${this.boardId}/list/${this.renameListId}`, {
          name: this.lists.filter(l => l.id === this.renameListId)[0].name
        })
        .then(response => {
          this.cancelRename();
          this.load();
        });
    },
    cancelListRename : function () {
      this.renameListId = null;
    },
    renameBoard : function() {
      this.renameBoardMode = true;
    },
    updateBoard : function () {
      axios
        .put(`http://localhost:3000/api/board/${this.board.id}`, {
          name: this.board.name
        })
        .then(response => {
          this.cancelBoardRename();
          this.loadAll();
        });
    },
    cancelBoardRename : function () {
      this.renameBoardMode = false;
    },
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
  width: 320px;
  padding: 10px;
}
.wrap-text {
  overflow-wrap: break-word;
}
</style>