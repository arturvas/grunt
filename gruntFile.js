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
          "dev/styles/main.css": "src/styles/main.less", // Define a saída do CSS.
        },
      },
      // Configuração da tarefa 'less' para compilar arquivos LESS em CSS (production).
      production: {
        // Define opções específicas para a compilação em modo produção.
        options: {
          compress: true, // Habilita a compressão do CSS.
        },
        files: {
          "dist/styles/main.min.css": "src/styles/main.less", // Define o nome do arquivo de saída minificado.
        },
      },
    },
    watch: {
      less: {
        files: ["src/styles/**/*.less"],
        tasks: ["less:development"],
      },
    },
    replace: {
      dev: {
        options: {
          patterns: [
            {
              match: "ENDERECO_DO_CSS",
              replacement: "./styles/main.css",
            },
          ],
        },
        files: [
          {
            expand: true,
            flatten: true,
            src: ["src/index.html"],
            dest: "dev/",
          },
        ],
      },
    },
  });

  // Carrega o plugin 'grunt-contrib-less' para a tarefa 'less'.
  grunt.loadNpmTasks("grunt-contrib-less");

  grunt.loadNpmTasks("grunt-contrib-watch");

  grunt.loadNpmTasks("grunt-replace");

  // Registra a tarefa padrão 'default', que depende da tarefa 'less'.
  grunt.registerTask("default", ["watch"]);

  grunt.registerTask("build", ["less:production"]);
};
