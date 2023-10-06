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
  });

  // Carrega o plugin 'grunt-contrib-less' para a tarefa 'less'.
  grunt.loadNpmTasks("grunt-contrib-less");

  // Registra a tarefa padrão 'default', que depende da tarefa 'less'.
  grunt.registerTask("default", ["less:development"]);

  grunt.registerTask("build", ["less:production"]);
};
