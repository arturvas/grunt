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
    // Configuração da tarefa 'watch' para monitorar alterações nos arquivos.
    watch: {
      less: {
        // Define quais arquivos serão monitorados para mudanças (arquivos LESS no diretório src/styles).
        files: ["src/styles/**/*.less"],
        // Define as tarefas a serem executadas quando um arquivo LESS for modificado (executa a tarefa 'less:development').
        tasks: ["less:development"],
      },
      html: {
        // Define quais arquivos serão monitorados para mudanças (arquivo index.html no diretório src).
        files: ["src/index.html"],
        // Define as tarefas a serem executadas quando o arquivo index.html for modificado (executa a tarefa 'replace:dev').
        tasks: ["replace:dev"],
      },
    },
    // Configuração da tarefa 'replace' para substituir URLs nos arquivos HTML.
    replace: {
      dev: {
        options: {
          patterns: [
            // Define padrões de substituição, substituindo 'ENDERECO_DO_CSS' por './styles/main.css' e 'ENDERECO_DO_JS' por '../src/scripts/main.js'.
            {
              match: "ENDERECO_DO_CSS",
              replacement: "./styles/main.css",
            },
            {
              match: "ENDERECO_DO_JS",
              replacement: "../src/scripts/main.js",
            },
          ],
        },
        files: [
          {
            // Define a origem (src/index.html) e o destino (dev/), onde as substituições serão aplicadas.
            expand: true,
            flatten: true,
            src: ["src/index.html"],
            dest: "dev/",
          },
        ],
      },
      dist: {
        options: {
          patterns: [
            // Define padrões de substituição, substituindo 'ENDERECO_DO_CSS' por './styles/main.min.css' e 'ENDERECO_DO_JS' por './scripts/main.min.js'.
            {
              match: "ENDERECO_DO_CSS",
              replacement: "./styles/main.min.css",
            },
            {
              match: "ENDERECO_DO_JS",
              replacement: "./scripts/main.min.js",
            },
          ],
        },
        files: [
          {
            // Define a origem (prebuild/index.html) e o destino (dist/), onde as substituições serão aplicadas.
            expand: true,
            flatten: true,
            src: ["prebuild/index.html"],
            dest: "dist/",
          },
        ],
      },
    },
    // Configuração da tarefa 'htmlmin' para minificar o arquivo HTML.
    htmlmin: {
      dist: {
        options: {
          removeComments: true, // Remove comentários do HTML.
          collapseWhitespace: true, // Remove espaços em branco em excesso.
        },
        files: {
          // Define o arquivo de origem (src/index.html) e o arquivo de destino (prebuild/index.html) após a minificação.
          "prebuild/index.html": "src/index.html",
        },
      },
    },
    // Configuração da tarefa 'clean' para remover arquivos temporários.
    clean: ["prebuild"],

    // Configuração da tarefa 'uglify' para minificar o arquivo JavaScript.
    uglify: {
      target: {
        files: {
          // Define o arquivo JavaScript de origem (src/scripts/main.js) e o arquivo de destino minificado (dist/scripts/main.min.js).
          "dist/scripts/main.min.js": "src/scripts/main.js",
        },
      },
    },
  });

  // Carrega o plugin 'grunt-contrib-less' para compilação de arquivos LESS em CSS.
  grunt.loadNpmTasks("grunt-contrib-less");

  // Carrega o plugin 'grunt-contrib-watch' para monitorar alterações em arquivos e executar tarefas automaticamente.
  grunt.loadNpmTasks("grunt-contrib-watch");

  // Carrega o plugin 'grunt-replace' para substituir texto em arquivos.
  grunt.loadNpmTasks("grunt-replace");

  // Carrega o plugin 'grunt-contrib-htmlmin' para minificar arquivos HTML.
  grunt.loadNpmTasks("grunt-contrib-htmlmin");

  // Carrega o plugin 'grunt-contrib-clean' para remover arquivos e diretórios.
  grunt.loadNpmTasks("grunt-contrib-clean");

  // Carrega o plugin 'grunt-contrib-uglify' para minificar arquivos JavaScript.
  grunt.loadNpmTasks("grunt-contrib-uglify");

  // Registra a tarefa padrão 'default', que depende da tarefa 'less'.
  grunt.registerTask("default", ["watch"]);

  // Registra a tarefa personalizada 'build' que consiste em várias sub-tarefas.
  grunt.registerTask("build", [
    "less:production", // Compila arquivos LESS em CSS minificado.
    "htmlmin:dist", // Minifica o arquivo HTML.
    "replace:dist", // Substitui URLs nos arquivos HTML.
    "clean", // Remove arquivos temporários.
    "uglify", // Minifica o arquivo JavaScript.
  ]);
};
