class OrganizationsController < ApplicationController

  def create
    org = Organization.create!(organization_params)
    render json: org, status: :created
  end

  def show
    user = User.find(session[:user_id])
    org = Organization.find(params[:id])
    if user.organization_id == org.id
      render json: org, status: :ok
    else
      render json: { error: 'You are not authorized to view or make edits to organizaitons you are not associated with.' }
    end
  end

  private
  def organization_params
    params.permit(:name)
  end

end
