class DiretoriosController < ApplicationController
  before_action :set_diretorio, only: [:show, :edit, :update, :destroy]

  def seu_diretorio
    @diretorios = Diretorio.where(pessoa_id: params[:id]).first
    render json: @diretorios
  end

  def sub_pastas
    @diretorios = Diretorio.where(diretorio_id: params[:id])
    render json: @diretorios
  end
  
  # GET /diretorios/1
  # GET /diretorios/1.json
  def show
    render json: @diretorio
  end

  # POST /diretorios
  # POST /diretorios.json
  def create
    @diretorio = Diretorio.new(diretorio_params)
     if @diretorio.save
      render json:  @diretorio
    else
      render json: @diretorio.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /diretorios/1
  # PATCH/PUT /diretorios/1.json
  def update
    if @diretorio.update(diretorio_params)
      render json:  @diretorio
    else
      render json: @diretorio.errors, status: :unprocessable_entity 
    end
  end

  # DELETE /diretorios/1
  # DELETE /diretorios/1.json
  def destroy
    @diretorio.destroy
    render json: @diretorio
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_diretorio
      @diretorio = Diretorio.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def diretorio_params
      params.require(:diretorio).permit(:nome, :pessoa_id, :diretorio_id)
    end
end
