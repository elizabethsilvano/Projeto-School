<template>
  <div class="add-students">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h2>Adicionar novo Aluno</h2>
            </div>
            <div class="card-body">
              <div class="col-md-6">
                <div class="alert alert-success" v-if="success">
                  Dados salvos com sucesso!
                </div>
                <form @submit.prevent="addStudent">
                  <div class="form-group">
                    <label class="label">Nome</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="student.name"
                      required="required"
                    />
                  </div>
                  <div class="form-group">
                    <label class="label">Curso</label>
                    <select
                      class="form-control"
                      v-model="student.course"
                      required="required"
                    >
                      <option value="Django">Django</option>
                      <option value="Python">Python</option>
                      <option value="Ruby">Ruby</option>
                      <option value="Vue.js">Vue.js</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label class="label">Número da Matrícula</label>
                    <input
                      type="number"
                      class="form-control"
                      v-model="student.number"
                      required="required"
                    />
                  </div>
                  <router-link to="/students" class="btn btn-info"
                    >Voltar</router-link
                  >
                  <button class="btn btn-success" :disabled="loading">
                    <span v-if="loading">
                      <rotate-square2></rotate-square2>
                    </span>
                    <span v-if="!loading">Salvar</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { RotateSquare2 } from "vue-loading-spinner";

export default {
  name: "Add-Students",
  data() {
    return {
      student: {
        name: "",
        course: "",
        number: "",
      },
      success: "",
    };
  },

  components: {
    RotateSquare2,
  },

  props: {
    loading: { type: Boolean },
  },

  methods: {
    addStudent() {
      axios({
        method: "post",
        url: "http://127.0.0.1:8000/api/students/",
        data: {
          name: this.student.name,
          course: this.student.course,
          number: this.student.number,
        },
      })
        .then((response) => {
          let newStudent = {
            id: response.data.id,
            name: this.name,
            course: this.course,
            number: this.number,
          };
          this.success = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
