class OrganizationsController < ApplicationController
  before_action :authorize_user_crud, only: [:show, :update, :delete]

  def create
    org = Organization.create!(organization_params)
    render json: org, status: :created
  end

  def show
    org = Organization.find(params[:id])
    render json: org, status: :ok 
  end

  def update
    org = Organization.find(params[:id])
    org.update!(organization_params)
    render json: org, status: :ok
  end

  def destroy
    org = Organization.find(params[:id])
    org.destroy
    head :no_content
  end

  private
  def organization_params
    params.permit(:name, :id)
  end

  def authorize_user_crud
    org = Organization.find(params[:id])
    user = User.find(session[:user_id])
    return render json: { error: 'You are not authorized to view or make edits to organizaitons you are not associated with or an Administrator of.' }, status: :unauthorized unless user.organization_id == org.id && user.is_admin
  end

end
