require 'test_helper'

class DiretoriosControllerTest < ActionDispatch::IntegrationTest
  setup do
    @diretorio = diretorios(:one)
  end

  test "should get index" do
    get diretorios_url
    assert_response :success
  end

  test "should get new" do
    get new_diretorio_url
    assert_response :success
  end

  test "should create diretorio" do
    assert_difference('Diretorio.count') do
      post diretorios_url, params: { diretorio: { diretorio_id: @diretorio.diretorio_id, nome: @diretorio.nome, pessoa_id: @diretorio.pessoa_id } }
    end

    assert_redirected_to diretorio_url(Diretorio.last)
  end

  test "should show diretorio" do
    get diretorio_url(@diretorio)
    assert_response :success
  end

  test "should get edit" do
    get edit_diretorio_url(@diretorio)
    assert_response :success
  end

  test "should update diretorio" do
    patch diretorio_url(@diretorio), params: { diretorio: { diretorio_id: @diretorio.diretorio_id, nome: @diretorio.nome, pessoa_id: @diretorio.pessoa_id } }
    assert_redirected_to diretorio_url(@diretorio)
  end

  test "should destroy diretorio" do
    assert_difference('Diretorio.count', -1) do
      delete diretorio_url(@diretorio)
    end

    assert_redirected_to diretorios_url
  end
end
