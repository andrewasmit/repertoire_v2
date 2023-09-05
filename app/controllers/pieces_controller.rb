class PiecesController < ApplicationController
  attr_accessor :piece
  before_action :find_piece, except: :create
  before_action :authenticate_user_for_edits, only: [:update, :destroy]
  
  def create
    piece = Piece.create!(piece_params)
    render json: piece, status: :created
  end

  def show
    render json: @piece, status: :ok
  end

  def update
    @piece.update(piece_params)
    render json: @piece, status: :ok
  end

  def destroy
    @piece.destroy
    head :no_content
  end

  private
  def piece_params
    params.permit(
      :id, 
      :title, 
      :composer, 
      :number_of_players, 
      :genre, 
      :difficulty, 
      :reference_recording,
      :organization_id
    )
  end

  def find_piece
    @piece = Piece.find(params[:id])
  end

  def authenticate_user_for_edits
    me = User.find(session[:user_id])
    return render json: { error: 'You must be an administrator for this organization in order to edit or delete pieces from your library.' } unless me.is_admin
  end

end
