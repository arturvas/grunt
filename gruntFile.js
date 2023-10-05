// module.exports = variavel
// function = definindo funcao
// (grunt) = argumento da função

// Exporta uma função que será executada quando o Grunt for iniciado,
// recebendo o objeto 'grunt' como argumento.
module.exports = function (grunt) {
  // Inicializa as configurações do Grunt.
  grunt.initConfig({
    // Lê o arquivo package.json para obter informações sobre o projeto.
    pkg: grunt.file.readJSON("package.json"),
    // Configuração da tarefa 'less' para compilar arquivos LESS em CSS.
    less: {
      development: {
        files: {
          "main.css": "main.less", // Define a saída do CSS.
        },
      },
    },
  });

  // Registra uma tarefa personalizada chamada 'olaGrunt'.
  grunt.registerTask("olaGrunt", function () {
    // Captura a função 'done' para indicar o término da tarefa.
    const done = this.async();
    // Após 3 segundos, imprime "Olá Grunt" no console.
    setTimeout(function () {
      console.log("Olá Grunt");
      // Indica que a tarefa foi concluída.
      done();
    }, 3000);
  });

  // Carrega o plugin 'grunt-contrib-less' para a tarefa 'less'.
  grunt.loadNpmTasks("grunt-contrib-less");

  // Registra a tarefa padrão 'default', que depende da tarefa 'less'.
  grunt.registerTask("default", ["less"]);
};
