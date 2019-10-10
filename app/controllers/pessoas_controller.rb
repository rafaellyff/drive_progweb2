class PessoasController < ApplicationController
  before_action :set_pessoa, only: [:show, :edit, :update, :destroy]

  # GET /pessoas
  # GET /pessoas.json
  def index
    @pessoas = Pessoa.all
    render json: @pessoas
  end

  # GET /pessoas/1
  # GET /pessoas/1.json
  def show
    render json: @pessoa
  end

  def verificar_login
    verificacao = Pessoa.email_disponivel(params[:login]).to_json
    render json: verificacao
  end

  def logar
    verificacao = Pessoa.validar_sessao(params[:login], params[:senha]).to_json
    render json: verificacao
  end

  # POST /pessoas
  # POST /pessoas.json
  def create
    @pessoa = Pessoa.new(pessoa_params)
    if @pessoa.save
      @diretorio = Diretorio.create(nome: "Arquivos - " + @pessoa.nome, pessoa_id: @pessoa.id)
      render json:  {id: @diretorio.id , usuario: @pessoa.id}
    else
      render json: @pessoa.errors, status: :unprocessable_entity
    end
  end


  # PATCH/PUT /pessoas/1
  # PATCH/PUT /pessoas/1.json
  def update
    if @pessoa.update(pessoa_params)
      render json:  @pessoa
    else
      render json: @pessoa.errors, status: :unprocessable_entity 
    end
  end

  # DELETE /pessoas/1
  # DELETE /pessoas/1.json
  def destroy
    @pessoa.destroy
    render json: @pessoa
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_pessoa
      @pessoa = Pessoa.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def pessoa_params
      params.require(:pessoa).permit(:nome, :login, :senha)
    end
end
