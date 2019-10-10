require "application_system_test_case"

class DiretoriosTest < ApplicationSystemTestCase
  setup do
    @diretorio = diretorios(:one)
  end

  test "visiting the index" do
    visit diretorios_url
    assert_selector "h1", text: "Diretorios"
  end

  test "creating a Diretorio" do
    visit diretorios_url
    click_on "New Diretorio"

    fill_in "Diretorio", with: @diretorio.diretorio_id
    fill_in "Nome", with: @diretorio.nome
    fill_in "Pessoa", with: @diretorio.pessoa_id
    click_on "Create Diretorio"

    assert_text "Diretorio was successfully created"
    click_on "Back"
  end

  test "updating a Diretorio" do
    visit diretorios_url
    click_on "Edit", match: :first

    fill_in "Diretorio", with: @diretorio.diretorio_id
    fill_in "Nome", with: @diretorio.nome
    fill_in "Pessoa", with: @diretorio.pessoa_id
    click_on "Update Diretorio"

    assert_text "Diretorio was successfully updated"
    click_on "Back"
  end

  test "destroying a Diretorio" do
    visit diretorios_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Diretorio was successfully destroyed"
  end
end
