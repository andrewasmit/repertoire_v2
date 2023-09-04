class EnsemblesController < ApplicationController
  attr_accessor :ensemble
  before_action :authenticate, only: [:update, :destroy]
  before_action :find_ensemble, only: [:show, :update, :destroy]

  def create
    ensemble = Ensemble.create!(ensemble_params)
    render json: ensemble, status: :created
  end

  def show
    render json: @ensemble, status: :ok
  end

  def update
    @ensemble.update(ensemble_params)
    render json: @ensemble, status: :ok
  end

  def destroy
    @ensemble.destroy
    head :no_content
  end

  private
  def ensemble_params
    params.permit(:id, :organization_id, :name, :grade_level)
  end
  
  def find_ensemble
    @ensemble = Ensemble.find(params[:id])
  end

  def authenticate
    me = User.find(session[:user_id])
    byebug
    return render json: { error: 'You must be an administrator to make edits to this ensemble.' } unless me.is_admin
  end
end
