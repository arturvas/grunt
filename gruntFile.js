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
    // Configuração da tarefa 'less' para compilar arquivos LESS em CSS (development).
    less: {
      development: {
        files: {
          "main.css": "main.less", // Define a saída do CSS.
        },
      },
      // Configuração da tarefa 'less' para compilar arquivos LESS em CSS (production).
      production: {
        // Define opções específicas para a compilação em modo produção.
        options: {
          compress: true, // Habilita a compressão do CSS.
        },
        files: {
          "main.min.css": "main.less", // Define o nome do arquivo de saída minificado.
        },
      },
    },
    sass: {
      dist: {
        // A tarefa 'sass' é configurada para compilar arquivos SCSS em CSS.
        // Define opções específicas para a compilação.
        options: {
          style: "compressed", // Habilita a compressão do CSS.
        },
        // Define os arquivos de entrada (SCSS) e os arquivos de saída (CSS).
        files: {
          "main2.css": "main.scss", // Define o nome do arquivo de saída minificado.
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

  // Carrega o plugin 'grunt-contrib-sass' para a tarefa 'sass'.
  grunt.loadNpmTasks("grunt-contrib-sass");

  // Registra a tarefa padrão 'default', que depende da tarefa 'less'.
  grunt.registerTask("default", ["less", "sass"]);
};
