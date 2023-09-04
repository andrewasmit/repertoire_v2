class UsersController < ApplicationController
  skip_before_action :authorize, only: [:create]

  def create
    user = User.create!(user_params)
    session[:user_id] = user.id
    render json: user, status: :created
  end

  def show
    user = User.find(session[:user_id])
    if params[:id].to_i == user.id 
      render json: user, status: :ok
    else
      render json: { error: "You are only authorized to view the user who is signed in." }, status: :unauthorized
    end
  end

  def update
    user = User.find(session[:user_id])
    user.update(user_params)
    render json: user, status: :ok
  end

  def destroy
      user = User.find(session[:user_id])
      user.destroy
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

end
