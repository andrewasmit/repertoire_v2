class NotesController < ApplicationController
  attr_accessor :note
  before_action :authenticate_note, only: [:show, :update, :destroy]
  
  def create
    note = Note.create!(note_params)
    render json: note, status: :created
  end

  def show
    render json: @note, status: :ok
  end

  def update
    @note.update(note_params)
    render json: @note, status: :ok
  end

  def destroy
    @note.destroy
    head :no_content
  end

  private
  def note_params
    params.permit(:id, :user_id, :piece_id, :note)
  end

  def authenticate_note
    @note = Note.find(params[:id])
    author = User.find(@note.user_id)
    me = User.find(session[:user_id])
    my_organization = Organization.find(me.organization_id)
    render json: { error: 'You are only allowed to view or make changes to notes that you created or are associated with your organization.' }, status: :unauthorized unless author.id == me.id || author.organization_id == my_organization.id
  end

end
