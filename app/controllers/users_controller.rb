class UsersController < ApplicationController
  attr_accessor :user
  skip_before_action :authorize, only: [:create]
  before_action :find_and_authenticate_user, only: [:show, :update, :destroy]

  def create
    user = User.create!(user_params)
    session[:user_id] = user.id
    render json: user, status: :created
  end

  def show
    render json: @user, status: :ok
  end

  def update
    @user.update(user_params)
    render json: user, status: :ok
  end

  def destroy
    @user.destroy
    head :no_content
  end

  private
  def user_params
    params.permit(
      :username, 
      :password, 
      :password_confirmation, 
      :email_address, 
      :organization_id,
      :id
    )
  end

  def find_and_authenticate_user
    @user = User.find(session[:user_id])
    return render json: { error: 'You are only authorized to view or make changes to the user who is signed in.' }, status: :unauthorized unless @user.id == session[:user_id] && params[:id].to_i == session[:user_id]
  end

end
