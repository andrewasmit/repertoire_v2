class ConcertsController < ApplicationController
  attr_accessor :ensemble
  before_action :find_and_authenticate_concert, only: [:show, :update, :destroy]

  def create
    concert = Concert.create!(concert_params)
    render json: concert, status: :created
  end

  def show
    render json: @concert, status: :ok
  end

  def update
    @concert.update(concert_params)
    render json: @concert, status: :ok
  end

  def destroy
    @concert.destroy
    head :no_content
  end

  private
  def concert_params
    params.permit(:id, :title, :year, :organization_id)
  end

  def find_and_authenticate_concert
    @concert = Concert.find(params[:id])
    auth = User.find(session[:user_id]).organization_id == @concert.organization_id
    return render json: { error: 'You are not authorized to view or make changes to concerts that are not associated with your organization.' } unless auth
  end
end
