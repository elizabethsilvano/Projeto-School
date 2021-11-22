<template>
  <div class="students">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h2>
                <router-link to="/students/add/" class="btn btn-success">Cadastrar novo Aluno</router-link>
              </h2>
            </div>
            <div class="card-body">
              <div class="form-group">
                <input type="text" v-model="search" class="form-control" placeholder="Pesquisar">
              </div>
              <table class="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Curso</th>
                    <th>Status</th>
                    <th>Data de Entrada</th>
                    <th>Nº Matrícula</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(student, index) in filterStudent" :key="student.id">
                    <td>{{ index+1 }}.</td>
                    <td>{{ student.name }}</td>
                    <td>{{ student.course }}</td>
                    <td>
                      <span v-if="student.status === true" class="badge badge-success">Ativo</span>
                      <span v-else class="badge badge-danger">Inativo</span>
                    </td>
                    <td>{{moment(student.date).format('DD-MM-YYYY')}}</td>
                    <td>{{ student.number }}</td>
                    <td>
                      <router-link :to="{ name: 'EditStudent', params: { id: student.id }}" class="btn btn-info">Editar</router-link>
                      <button class="btn btn-danger" v-on:click="delet(student.id)">Excluir</button>
                    </td>
                    <div class="modal">
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            Exluir?
                          </div>
                          <div class="modal-body">
                            Tem certeza que deseja excluir estes dados?
                          </div>
                          <div class="modal-footer">
                            <button class="btn btn-outline-danger">Excluir</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Students',
  data() {
    return {
      students: [],
      search: ''
    }
  },

  mounted() {
    this.showStudents()
  },

  methods: {
    showStudents() {
      axios({
        method: 'get',
        url: 'http://127.0.0.1:8000/api/students/',
      })
      .then(response => this.students = response.data)
    },

    delet(id_student) {
      if (confirm("Excluir dados?")) {
        axios({
          method: 'delete',
          url: 'http://127.0.0.1:8000/api/students/' + id_student
        })
        .then(res => {
          this.showStudents()
        })
      }
    }
  },

  computed: {
    filterStudent() {
      return this.students.filter(student => {
        return student.name.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  }
}
</script>
